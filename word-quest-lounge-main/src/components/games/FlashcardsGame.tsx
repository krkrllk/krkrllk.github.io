import { useState } from "react";
import { wordPairs } from "@/data/words";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, RotateCcw, ChevronLeft, ChevronRight } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface FlashcardsGameProps {
  onBack: () => void;
}

export const FlashcardsGame = ({ onBack }: FlashcardsGameProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const currentWord = wordPairs[currentIndex];
  const progress = ((currentIndex + 1) / wordPairs.length) * 100;

  const handleNext = () => {
    if (currentIndex < wordPairs.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setIsFlipped(false);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setIsFlipped(false);
    }
  };

  const handleReset = () => {
    setCurrentIndex(0);
    setIsFlipped(false);
  };

  return (
    <div className="min-h-screen p-6 animate-slide-up">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <Button onClick={onBack} variant="outline" size="lg" className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
          <h1 className="text-4xl font-bold gradient-primary bg-clip-text text-transparent">
            Flashcards
          </h1>
          <Button onClick={handleReset} variant="outline" size="lg" className="gap-2">
            <RotateCcw className="w-4 h-4" />
            Reset
          </Button>
        </div>

        <div className="mb-6">
          <Progress value={progress} className="h-2" />
          <p className="text-center mt-2 text-muted-foreground">
            Card {currentIndex + 1} of {wordPairs.length}
          </p>
        </div>

        <div className="perspective-1000 mb-8">
          <Card
            onClick={() => setIsFlipped(!isFlipped)}
            className={`relative h-80 cursor-pointer transition-all duration-500 shadow-card hover:shadow-hover ${
              isFlipped ? "[transform:rotateY(180deg)]" : ""
            }`}
            style={{ transformStyle: "preserve-3d" }}
          >
            <div
              className="absolute inset-0 flex items-center justify-center p-8 backface-hidden gradient-primary rounded-lg"
              style={{ backfaceVisibility: "hidden" }}
            >
              <div className="text-center">
                <p className="text-white/70 text-sm mb-2">English</p>
                <h2 className="text-5xl font-bold text-white">{currentWord.english}</h2>
                <p className="text-white/60 text-sm mt-4">Click to flip</p>
              </div>
            </div>
            <div
              className="absolute inset-0 flex items-center justify-center p-8 backface-hidden gradient-secondary rounded-lg"
              style={{
                backfaceVisibility: "hidden",
                transform: "rotateY(180deg)",
              }}
            >
              <div className="text-center">
                <p className="text-white/70 text-sm mb-2">Ukrainian</p>
                <h2 className="text-5xl font-bold text-white">{currentWord.ukrainian}</h2>
                <p className="text-white/60 text-sm mt-4">Click to flip back</p>
              </div>
            </div>
          </Card>
        </div>

        <div className="flex justify-center gap-4">
          <Button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            size="lg"
            variant="outline"
            className="gap-2"
          >
            <ChevronLeft className="w-5 h-5" />
            Previous
          </Button>
          <Button
            onClick={handleNext}
            disabled={currentIndex === wordPairs.length - 1}
            size="lg"
            className="gap-2 gradient-primary"
          >
            Next
            <ChevronRight className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};
