import { motion } from 'framer-motion';

const steps = [
  { num: 1, label: 'Shape' },
  { num: 2, label: 'Style' },
  { num: 3, label: 'Graphics' },
  { num: 4, label: 'Details' },
];

export default function StepIndicator({ currentStep, onStepClick }) {
  return (
    <div className="flex items-center justify-center gap-2 sm:gap-4 mb-8">
      {steps.map(({ num, label }, i) => {
        const isActive = num === currentStep;
        const isCompleted = num < currentStep;

        return (
          <div key={num} className="flex items-center gap-2 sm:gap-4">
            <button
              onClick={() => isCompleted && onStepClick(num)}
              className={`flex items-center gap-2 transition-all ${isCompleted ? 'cursor-pointer' : 'cursor-default'}`}
            >
              <div className="relative">
                <motion.div
                  animate={{
                    scale: isActive ? 1.1 : 1,
                    backgroundColor: isActive
                      ? '#06b6d4'
                      : isCompleted
                        ? '#3b82f6'
                        : '#334155',
                  }}
                  className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold"
                >
                  {isCompleted ? (
                    <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <span className={isActive ? 'text-white' : 'text-forge-400'}>{num}</span>
                  )}
                </motion.div>
                {isActive && (
                  <motion.div
                    layoutId="stepGlow"
                    className="absolute -inset-1 rounded-full bg-accent-cyan/20 blur-sm"
                    transition={{ type: 'spring', duration: 0.5 }}
                  />
                )}
              </div>
              <span className={`hidden sm:inline text-sm font-medium ${isActive ? 'text-snow' : 'text-forge-400'}`}>
                {label}
              </span>
            </button>

            {i < steps.length - 1 && (
              <div className="w-8 sm:w-16 h-px bg-forge-600">
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: isCompleted ? 1 : 0 }}
                  className="h-full bg-accent-blue origin-left"
                  transition={{ duration: 0.3 }}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
