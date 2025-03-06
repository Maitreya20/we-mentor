
import { useState } from 'react';
import { useWater } from '@/contexts/WaterContext';
import { PlusCircle, MinusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

type AmountOption = {
  value: number;
  label: string;
};

const amountOptions: AmountOption[] = [
  { value: 50, label: '50ml' },
  { value: 100, label: '100ml' },
  { value: 200, label: '200ml' },
  { value: 250, label: '250ml' },
  { value: 300, label: '300ml' },
  { value: 500, label: '500ml' },
];

export function WaterAmountButton() {
  const { addWaterIntake } = useWater();
  const [selectedAmount, setSelectedAmount] = useState<number>(250);
  const [showRipple, setShowRipple] = useState(false);
  const [rippleStyle, setRippleStyle] = useState({});

  const handleAddWater = () => {
    addWaterIntake(selectedAmount);
    
    // Create ripple effect
    setShowRipple(true);
    setTimeout(() => setShowRipple(false), 600);
  };

  const handleAmountChange = (value: number) => {
    setSelectedAmount(value);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="grid grid-cols-3 gap-2 mb-4">
        {amountOptions.map((option) => (
          <button
            key={option.value}
            className={`py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
              selectedAmount === option.value
                ? 'bg-water-500 text-white shadow-md scale-105'
                : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
            }`}
            onClick={() => handleAmountChange(option.value)}
          >
            {option.label}
          </button>
        ))}
      </div>
      
      <div className="flex items-center gap-4 mb-2">
        <Button
          variant="outline"
          size="icon"
          className="rounded-full h-12 w-12 border-gray-200 hover:bg-gray-50"
          onClick={() => setSelectedAmount(Math.max(50, selectedAmount - 50))}
        >
          <MinusCircle className="h-5 w-5 text-gray-500" />
        </Button>
        
        <div className="relative flex-1">
          <Button
            className="w-full h-16 bg-water-500 hover:bg-water-600 text-white rounded-2xl text-xl font-medium relative overflow-hidden transition-transform active:scale-95"
            onClick={handleAddWater}
          >
            Add {selectedAmount}ml
            {showRipple && (
              <span 
                className="absolute rounded-full bg-white/20 animate-ripple"
                style={rippleStyle}
              />
            )}
          </Button>
        </div>
        
        <Button
          variant="outline"
          size="icon"
          className="rounded-full h-12 w-12 border-gray-200 hover:bg-gray-50"
          onClick={() => setSelectedAmount(Math.min(1000, selectedAmount + 50))}
        >
          <PlusCircle className="h-5 w-5 text-gray-500" />
        </Button>
      </div>
    </div>
  );
}
