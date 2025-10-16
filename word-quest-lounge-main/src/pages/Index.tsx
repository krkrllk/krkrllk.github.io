import { useState } from "react";
import { GameCard } from "@/components/GameCard";
import { FlashcardsGame } from "@/components/games/FlashcardsGame";
import { MatchingGame } from "@/components/games/MatchingGame";
import { QuizGame } from "@/components/games/QuizGame";
import { TypeRaceGame } from "@/components/games/TypeRaceGame";
import { MemoryGame } from "@/components/games/MemoryGame";
import { WordScrambleGame } from "@/components/games/WordScrambleGame";
import { BookOpen, Puzzle, Brain, GraduationCap, Zap, Eye, Shuffle } from "lucide-react";

type GameType = "menu" | "flashcards" | "matching" | "quiz" | "typerace" | "memory" | "scramble";

const Index = () => {
  const [currentGame, setCurrentGame] = useState<GameType>("menu");

  const renderGame = () => {
    switch (currentGame) {
      case "flashcards":
        return <FlashcardsGame onBack={() => setCurrentGame("menu")} />;
      case "matching":
        return <MatchingGame onBack={() => setCurrentGame("menu")} />;
      case "typerace":
        return <TypeRaceGame onBack={() => setCurrentGame("menu")} />;
      case "memory":
        return <MemoryGame onBack={() => setCurrentGame("menu")} />;
      case "scramble":
        return <WordScrambleGame onBack={() => setCurrentGame("menu")} />;
      default:
        return (
          <div className="min-h-screen flex flex-col items-center justify-center p-6">
            <div className="max-w-6xl w-full">
              <div className="text-center mb-12 animate-slide-up">
                <div className="inline-block p-4 bg-white/10 rounded-3xl backdrop-blur-sm mb-6">
                  <GraduationCap className="w-20 h-20 gradient-primary bg-clip-text" style={{ fill: 'url(#grad)' }} />
                  <svg width="0" height="0">
                    <defs>
                      <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style={{ stopColor: 'hsl(265 85% 58%)', stopOpacity: 1 }} />
                        <stop offset="100%" style={{ stopColor: 'hsl(280 90% 65%)', stopOpacity: 1 }} />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
                <h1 className="text-6xl font-bold mb-4 gradient-primary bg-clip-text text-transparent">
                  Word Master
                </h1>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                  Master English-Ukrainian vocabulary through fun, interactive games. 
                  Choose your learning adventure below!
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <GameCard
                  title="Flashcards"
                  description="Flip cards to learn and memorize word pairs at your own pace"
                  icon={BookOpen}
                  onClick={() => setCurrentGame("flashcards")}
                  gradient="primary"
                />
                <GameCard
                  title="Type Race"
                  description="Type translations as fast as you can. Beat the clock!"
                  icon={Zap}
                  onClick={() => setCurrentGame("typerace")}
                  gradient="secondary"
                />
                <GameCard
                  title="Memory Game"
                  description="Find matching pairs by remembering card positions"
                  icon={Eye}
                  onClick={() => setCurrentGame("memory")}
                  gradient="primary"
                />
                <GameCard
                  title="Matching Game"
                  description="Match English words with their Ukrainian translations"
                  icon={Puzzle}
                  onClick={() => setCurrentGame("matching")}
                  gradient="secondary"
                />
                <GameCard
                  title="Word Scramble"
                  description="Unscramble letters to form the correct Ukrainian word"
                  icon={Shuffle}
                  onClick={() => setCurrentGame("scramble")}
                  gradient="primary"
                />
                <GameCard
                  title="Quiz Challenge"
                  description="Test your knowledge with multiple choice questions"
                  icon={Brain}
                  onClick={() => setCurrentGame("quiz")}
                  gradient="secondary"
                />
              </div>

              <div className="mt-12 text-center text-muted-foreground">
                <p className="text-sm">
                  📚 20 essential words • 🎮 6 engaging games • 🌟 Learn while having fun
                </p>
              </div>
            </div>
          </div>
        );
    }
  };

  return renderGame();
};

export default Index;
