import { useState, useEffect } from "react";
import { wordPairs } from "@/data/words";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, RotateCcw, Trophy, CheckCircle2, XCircle } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";

interface QuizGameProps {
  onBack: () => void;
}

export const QuizGame = ({ onBack }: QuizGameProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [options, setOptions] = useState<string[]>([]);

  const generateOptions = (correctAnswer: string, allWords: string[]) => {
    const wrongOptions = allWords
      .filter((word) => word !== correctAnswer)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);
    
    return [...wrongOptions, correctAnswer].sort(() => Math.random() - 0.5);
  };

  useEffect(() => {
    const allUkrainian = wordPairs.map((w) => w.ukrainian);
    const newOptions = generateOptions(
      wordPairs[currentQuestion].ukrainian,
      allUkrainian
    );
    setOptions(newOptions);
  }, [currentQuestion]);

  const handleAnswer = (answer: string) => {
    if (isAnswered) return;

    setSelectedAnswer(answer);
    setIsAnswered(true);

    const isCorrect = answer === wordPairs[currentQuestion].ukrainian;
    if (isCorrect) {
      setScore(score + 1);
      toast.success("Correct! 🎉");
    } else {
      toast.error("Incorrect. Try the next one!");
    }
  };

  const handleNext = () => {
    if (currentQuestion < wordPairs.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    }
  };

  const handleReset = () => {
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
  };

  const progress = ((currentQuestion + 1) / wordPairs.length) * 100;
  const isFinished = currentQuestion === wordPairs.length - 1 && isAnswered;

  return (
    <div className="min-h-screen p-6 animate-slide-up">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <Button onClick={onBack} variant="outline" size="lg" className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
          <h1 className="text-4xl font-bold gradient-primary bg-clip-text text-transparent">
            Quiz Challenge
          </h1>
          <Button onClick={handleReset} variant="outline" size="lg" className="gap-2">
            <RotateCcw className="w-4 h-4" />
            Reset
          </Button>
        </div>

        <div className="mb-6">
          <Progress value={progress} className="h-2" />
          <div className="flex justify-between mt-2 text-sm text-muted-foreground">
            <span>Question {currentQuestion + 1} of {wordPairs.length}</span>
            <span>Score: {score}/{wordPairs.length}</span>
          </div>
        </div>

        {isFinished ? (
          <Card className="p-12 text-center shadow-card gradient-primary animate-bounce-in">
            <Trophy className="w-24 h-24 mx-auto mb-4 text-white" />
            <h2 className="text-4xl font-bold text-white mb-4">Quiz Complete!</h2>
            <p className="text-white/90 text-2xl mb-6">
              Your Score: {score}/{wordPairs.length}
            </p>
            <p className="text-white/80 mb-6">
              {score === wordPairs.length
                ? "Perfect score! You're amazing! 🌟"
                : score >= wordPairs.length * 0.7
                ? "Great job! Keep it up! 👏"
                : "Good effort! Practice makes perfect! 💪"}
            </p>
            <Button onClick={handleReset} size="lg" variant="outline" className="gap-2">
              <RotateCcw className="w-4 h-4" />
              Try Again
            </Button>
          </Card>
        ) : (
          <>
            <Card className="p-8 mb-6 shadow-card gradient-primary">
              <div className="text-center">
                <p className="text-white/70 text-sm mb-2">Translate to Ukrainian</p>
                <h2 className="text-5xl font-bold text-white mb-4">
                  {wordPairs[currentQuestion].english}
                </h2>
              </div>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {options.map((option, index) => {
                const isCorrect = option === wordPairs[currentQuestion].ukrainian;
                const isSelected = selectedAnswer === option;
                
                return (
                  <Card
                    key={index}
                    onClick={() => handleAnswer(option)}
                    className={`p-6 cursor-pointer transition-all duration-300 hover:scale-105 shadow-card
                      ${!isAnswered ? "hover:shadow-hover" : ""}
                      ${isAnswered && isCorrect ? "gradient-secondary border-2 border-success" : ""}
                      ${isAnswered && isSelected && !isCorrect ? "border-2 border-destructive" : ""}
                      ${isAnswered ? "pointer-events-none" : ""}
                    `}
                  >
                    <div className="flex items-center justify-between">
                      <p className={`text-xl font-semibold ${isAnswered && (isCorrect || isSelected) ? "text-white" : "text-foreground"}`}>
                        {option}
                      </p>
                      {isAnswered && isCorrect && (
                        <CheckCircle2 className="w-6 h-6 text-white" />
                      )}
                      {isAnswered && isSelected && !isCorrect && (
                        <XCircle className="w-6 h-6 text-destructive" />
                      )}
                    </div>
                  </Card>
                );
              })}
            </div>

            {isAnswered && (
              <div className="text-center">
                <Button
                  onClick={handleNext}
                  size="lg"
                  className="gradient-primary animate-bounce-in"
                  disabled={currentQuestion === wordPairs.length - 1}
                >
                  {currentQuestion === wordPairs.length - 1 ? "Finish" : "Next Question"}
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};
