import { useState, useEffect } from "react";
import { wordPairs } from "@/data/words";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, RotateCcw, Trophy, Shuffle, Lightbulb } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";

interface WordScrambleGameProps {
  onBack: () => void;
}

export const WordScrambleGame = ({ onBack }: WordScrambleGameProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [scrambledWord, setScrambledWord] = useState("");
  const [selectedLetters, setSelectedLetters] = useState<string[]>([]);
  const [availableLetters, setAvailableLetters] = useState<{ letter: string; used: boolean }[]>([]);
  const [score, setScore] = useState(0);
  const [hintsUsed, setHintsUsed] = useState(0);

  const currentWord = wordPairs[currentIndex];
  const progress = ((currentIndex + 1) / wordPairs.length) * 100;

  const scrambleWord = (word: string) => {
    const letters = word.split("");
    for (let i = letters.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [letters[i], letters[j]] = [letters[j], letters[i]];
    }
    return letters;
  };

  useEffect(() => {
    const scrambled = scrambleWord(currentWord.ukrainian);
    setScrambledWord(scrambled.join(""));
    setAvailableLetters(scrambled.map((letter) => ({ letter, used: false })));
    setSelectedLetters([]);
  }, [currentIndex]);

  const handleLetterClick = (index: number) => {
    if (availableLetters[index].used) return;

    const newAvailable = [...availableLetters];
    newAvailable[index].used = true;
    setAvailableLetters(newAvailable);
    setSelectedLetters([...selectedLetters, availableLetters[index].letter]);
  };

  const handleRemoveLetter = (index: number) => {
    const letterToRemove = selectedLetters[index];
    const newSelected = selectedLetters.filter((_, i) => i !== index);
    setSelectedLetters(newSelected);

    const availableIndex = availableLetters.findIndex(
      (l, i) => l.letter === letterToRemove && l.used && 
      !newSelected.slice(0, index).includes(l.letter)
    );
    
    if (availableIndex !== -1) {
      const newAvailable = [...availableLetters];
      newAvailable[availableIndex].used = false;
      setAvailableLetters(newAvailable);
    }
  };

  const handleCheck = () => {
    const userAnswer = selectedLetters.join("");
    
    if (userAnswer === currentWord.ukrainian) {
      toast.success("Correct! 🎉");
      setScore(score + (hintsUsed === 0 ? 10 : 5));
      
      if (currentIndex < wordPairs.length - 1) {
        setCurrentIndex(currentIndex + 1);
        setHintsUsed(0);
      }
    } else {
      toast.error("Not quite right. Try again!");
    }
  };

  const handleHint = () => {
    if (hintsUsed === 0 && selectedLetters.length === 0) {
      toast.info(`Hint: This is "${currentWord.english}" in Ukrainian`);
      setHintsUsed(1);
    }
  };

  const handleShuffle = () => {
    const unused = availableLetters
      .map((l, i) => ({ ...l, index: i }))
      .filter((l) => !l.used);
    
    const shuffled = [...unused].sort(() => Math.random() - 0.5);
    const newAvailable = [...availableLetters];
    
    unused.forEach((original, i) => {
      newAvailable[original.index] = { ...shuffled[i], used: false };
    });
    
    setAvailableLetters(newAvailable);
  };

  const isFinished = currentIndex === wordPairs.length - 1 && selectedLetters.join("") === currentWord.ukrainian;

  return (
    <div className="min-h-screen p-6 animate-slide-up">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <Button onClick={onBack} variant="outline" size="lg" className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
          <h1 className="text-4xl font-bold gradient-primary bg-clip-text text-transparent">
            Word Scramble
          </h1>
          <div className="text-2xl font-bold gradient-secondary bg-clip-text text-transparent">
            Score: {score}
          </div>
        </div>

        <div className="mb-6">
          <Progress value={progress} className="h-2" />
          <p className="text-center mt-2 text-muted-foreground">
            Word {currentIndex + 1} of {wordPairs.length}
          </p>
        </div>

        {isFinished ? (
          <Card className="p-12 text-center shadow-card gradient-primary animate-bounce-in">
            <Trophy className="w-24 h-24 mx-auto mb-4 text-white" />
            <h2 className="text-4xl font-bold text-white mb-4">Puzzle Master!</h2>
            <p className="text-white/90 text-2xl mb-6">
              Final Score: {score} points
            </p>
            <Button onClick={() => { setCurrentIndex(0); setScore(0); }} size="lg" variant="outline" className="gap-2">
              <RotateCcw className="w-4 h-4" />
              Play Again
            </Button>
          </Card>
        ) : (
          <>
            <Card className="p-8 mb-6 shadow-card gradient-primary">
              <div className="text-center">
                <p className="text-white/70 text-sm mb-2">Unscramble this Ukrainian word</p>
                <h2 className="text-4xl font-bold text-white mb-2">
                  {currentWord.english}
                </h2>
              </div>
            </Card>

            <Card className="p-6 mb-6 shadow-card min-h-24">
              <div className="flex flex-wrap gap-2 justify-center items-center min-h-16">
                {selectedLetters.length === 0 ? (
                  <p className="text-muted-foreground text-lg">Tap letters below to build the word...</p>
                ) : (
                  selectedLetters.map((letter, index) => (
                    <Button
                      key={index}
                      onClick={() => handleRemoveLetter(index)}
                      size="lg"
                      className="text-2xl font-bold h-16 w-16 gradient-secondary"
                    >
                      {letter}
                    </Button>
                  ))
                )}
              </div>
            </Card>

            <Card className="p-6 mb-6 shadow-card">
              <div className="flex flex-wrap gap-2 justify-center">
                {availableLetters.map((item, index) => (
                  <Button
                    key={index}
                    onClick={() => handleLetterClick(index)}
                    disabled={item.used}
                    size="lg"
                    variant={item.used ? "outline" : "default"}
                    className={`text-2xl font-bold h-16 w-16 ${!item.used ? "gradient-primary" : "opacity-30"}`}
                  >
                    {item.letter}
                  </Button>
                ))}
              </div>
            </Card>

            <div className="flex justify-center gap-4">
              <Button
                onClick={handleHint}
                disabled={hintsUsed > 0}
                variant="outline"
                size="lg"
                className="gap-2"
              >
                <Lightbulb className="w-5 h-5" />
                Hint
              </Button>
              <Button
                onClick={handleShuffle}
                variant="outline"
                size="lg"
                className="gap-2"
              >
                <Shuffle className="w-5 h-5" />
                Shuffle
              </Button>
              <Button
                onClick={handleCheck}
                disabled={selectedLetters.length === 0}
                size="lg"
                className="gradient-primary"
              >
                Check Answer
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
