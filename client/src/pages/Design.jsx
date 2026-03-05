import { AnimatePresence } from 'framer-motion';
import { useDesign } from '../context/DesignContext';
import { generateDesign } from '../services/designService';
import StepIndicator from '../components/design/StepIndicator';
import ShapeSelector from '../components/design/ShapeSelector';
import StyleSelector from '../components/design/StyleSelector';
import GraphicSelector from '../components/design/GraphicSelector';
import CustomTextInput from '../components/design/CustomTextInput';
import GeneratingSpinner from '../components/design/GeneratingSpinner';
import DesignPreview from '../components/design/DesignPreview';
import Button from '../components/ui/Button';

export default function Design() {
  const { state, dispatch } = useDesign();

  const canGenerate = state.shape && state.ridingStyle && state.graphicStyle;

  const handleGenerate = async () => {
    dispatch({ type: 'START_GENERATING' });
    try {
      const result = await generateDesign({
        shape: state.shape,
        ridingStyle: state.ridingStyle,
        graphicStyle: state.graphicStyle,
        customText: state.customText,
      });
      dispatch({ type: 'GENERATION_SUCCESS', payload: result.design });
    } catch (error) {
      dispatch({
        type: 'GENERATION_ERROR',
        payload: error.response?.data?.error || 'Failed to generate design. Please try again.',
      });
    }
  };

  // Show preview if generation is complete
  if (state.generatedDesign) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12">
        <DesignPreview />
      </div>
    );
  }

  // Show spinner during generation
  if (state.isGenerating) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12">
        <GeneratingSpinner />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <StepIndicator
        currentStep={state.step}
        onStepClick={(step) => dispatch({ type: 'SET_STEP', payload: step })}
      />

      <AnimatePresence mode="wait">
        {state.step === 1 && <ShapeSelector key="shape" />}
        {state.step === 2 && <StyleSelector key="style" />}
        {state.step === 3 && <GraphicSelector key="graphic" />}
        {state.step === 4 && <CustomTextInput key="custom" />}
      </AnimatePresence>

      {/* Generate button on step 4 */}
      {state.step === 4 && (
        <div className="flex flex-col items-center mt-8 gap-4">
          <Button
            onClick={handleGenerate}
            disabled={!canGenerate}
            size="lg"
            className="min-w-[200px]"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            Forge My Board
          </Button>

          {state.error && (
            <p className="text-red-400 text-sm text-center">{state.error}</p>
          )}
        </div>
      )}

      {/* Back button for steps 2-4 */}
      {state.step > 1 && (
        <div className="flex justify-center mt-6">
          <Button
            variant="ghost"
            onClick={() => dispatch({ type: 'SET_STEP', payload: state.step - 1 })}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </Button>
        </div>
      )}
    </div>
  );
}
