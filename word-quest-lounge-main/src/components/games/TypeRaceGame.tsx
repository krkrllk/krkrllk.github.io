import { useState, useEffect } from "react";
import { wordPairs } from "@/data/words";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ArrowLeft, RotateCcw, Trophy, Timer } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";

interface TypeRaceGameProps {
  onBack: () => void;
}

export const TypeRaceGame = ({ onBack }: TypeRaceGameProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userInput, setUserInput] = useState("");
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  const currentWord = wordPairs[currentIndex];
  const progress = ((currentIndex + 1) / wordPairs.length) * 100;

  useEffect(() => {
    if (!isPlaying || gameOver) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setGameOver(true);
          setIsPlaying(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isPlaying, gameOver]);

  const startGame = () => {
    setIsPlaying(true);
    setGameOver(false);
    setCurrentIndex(0);
    setScore(0);
    setTimeLeft(60);
    setUserInput("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (userInput.toLowerCase().trim() === currentWord.ukrainian.toLowerCase()) {
      toast.success("Correct! 🚀");
      setScore(score + 1);
      setTimeLeft(timeLeft + 3); // Bonus time
      
      if (currentIndex < wordPairs.length - 1) {
        setCurrentIndex(currentIndex + 1);
      } else {
        setCurrentIndex(0);
      }
      setUserInput("");
    } else {
      toast.error("Incorrect. Try again!");
      setUserInput("");
    }
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
            Type Race
          </h1>
          <Button onClick={startGame} variant="outline" size="lg" className="gap-2">
            <RotateCcw className="w-4 h-4" />
            {isPlaying ? "Restart" : "Start"}
          </Button>
        </div>

        {!isPlaying && !gameOver ? (
          <Card className="p-12 text-center shadow-card gradient-primary animate-bounce-in">
            <Timer className="w-24 h-24 mx-auto mb-4 text-white" />
            <h2 className="text-4xl font-bold text-white mb-4">Ready to Race?</h2>
            <p className="text-white/90 text-lg mb-6">
              Type the Ukrainian translation as fast as you can!
              <br />
              You have 60 seconds. Get +3 seconds for each correct answer!
            </p>
            <Button onClick={startGame} size="lg" variant="outline" className="gap-2">
              Start Game
            </Button>
          </Card>
        ) : gameOver ? (
          <Card className="p-12 text-center shadow-card gradient-secondary animate-bounce-in">
            <Trophy className="w-24 h-24 mx-auto mb-4 text-white" />
            <h2 className="text-4xl font-bold text-white mb-4">Time's Up!</h2>
            <p className="text-white/90 text-2xl mb-6">
              Your Score: {score} words
            </p>
            <p className="text-white/80 mb-6">
              {score >= 15 ? "Amazing speed! 🏆" : score >= 10 ? "Great job! 🌟" : "Keep practicing! 💪"}
            </p>
            <Button onClick={startGame} size="lg" variant="outline" className="gap-2">
              <RotateCcw className="w-4 h-4" />
              Play Again
            </Button>
          </Card>
        ) : (
          <>
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-2">
                <Timer className="w-6 h-6 text-primary" />
                <span className={`text-2xl font-bold ${timeLeft <= 10 ? "text-destructive animate-pulse" : "text-primary"}`}>
                  {timeLeft}s
                </span>
              </div>
              <div className="text-2xl font-bold gradient-primary bg-clip-text text-transparent">
                Score: {score}
              </div>
            </div>

            <div className="mb-6">
              <Progress value={progress} className="h-2" />
            </div>

            <Card className="p-8 mb-6 shadow-card gradient-primary">
              <div className="text-center">
                <p className="text-white/70 text-sm mb-2">Type the Ukrainian translation</p>
                <h2 className="text-5xl font-bold text-white mb-4">
                  {currentWord.english}
                </h2>
              </div>
            </Card>

            <form onSubmit={handleSubmit} className="space-y-6">
              <Input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="Type your answer..."
                className="text-2xl text-center h-16 shadow-card"
                autoFocus
              />
              <div className="text-center">
                <Button type="submit" size="lg" className="gradient-secondary">
                  Submit Answer
                </Button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};
