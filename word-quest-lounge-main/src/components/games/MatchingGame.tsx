import { useState, useEffect } from "react";
import { wordPairs } from "@/data/words";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, RotateCcw, Trophy } from "lucide-react";
import { toast } from "sonner";

interface MatchingGameProps {
  onBack: () => void;
}

interface MatchCard {
  id: string;
  content: string;
  pairId: number;
  isEnglish: boolean;
  isMatched: boolean;
}

export const MatchingGame = ({ onBack }: MatchingGameProps) => {
  const [cards, setCards] = useState<MatchCard[]>([]);
  const [selected, setSelected] = useState<MatchCard[]>([]);
  const [matches, setMatches] = useState(0);

  const initializeGame = () => {
    const gameWords = wordPairs.slice(0, 6);
    const newCards: MatchCard[] = [];

    gameWords.forEach((word) => {
      newCards.push({
        id: `${word.id}-en`,
        content: word.english,
        pairId: word.id,
        isEnglish: true,
        isMatched: false,
      });
      newCards.push({
        id: `${word.id}-uk`,
        content: word.ukrainian,
        pairId: word.id,
        isEnglish: false,
        isMatched: false,
      });
    });

    setCards(newCards.sort(() => Math.random() - 0.5));
    setSelected([]);
    setMatches(0);
  };

  useEffect(() => {
    initializeGame();
  }, []);

  const handleCardClick = (card: MatchCard) => {
    if (card.isMatched || selected.find((c) => c.id === card.id)) return;

    const newSelected = [...selected, card];
    setSelected(newSelected);

    if (newSelected.length === 2) {
      if (newSelected[0].pairId === newSelected[1].pairId) {
        toast.success("Perfect match! 🎉");
        setCards(
          cards.map((c) =>
            c.pairId === card.pairId ? { ...c, isMatched: true } : c
          )
        );
        setMatches(matches + 1);
        setSelected([]);
      } else {
        toast.error("Not a match. Try again!");
        setTimeout(() => setSelected([]), 800);
      }
    }
  };

  const isWon = matches === 6;

  return (
    <div className="min-h-screen p-6 animate-slide-up">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <Button onClick={onBack} variant="outline" size="lg" className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
          <h1 className="text-4xl font-bold gradient-primary bg-clip-text text-transparent">
            Matching Game
          </h1>
          <Button onClick={initializeGame} variant="outline" size="lg" className="gap-2">
            <RotateCcw className="w-4 h-4" />
            New Game
          </Button>
        </div>

        <div className="text-center mb-8">
          <p className="text-2xl font-semibold">
            Matches: <span className="gradient-primary bg-clip-text text-transparent">{matches}/6</span>
          </p>
        </div>

        {isWon ? (
          <Card className="p-12 text-center shadow-card gradient-primary animate-bounce-in">
            <Trophy className="w-24 h-24 mx-auto mb-4 text-white" />
            <h2 className="text-4xl font-bold text-white mb-4">Congratulations!</h2>
            <p className="text-white/90 text-lg mb-6">You matched all pairs!</p>
            <Button onClick={initializeGame} size="lg" variant="outline" className="gap-2">
              <RotateCcw className="w-4 h-4" />
              Play Again
            </Button>
          </Card>
        ) : (
          <div className="grid grid-cols-3 md:grid-cols-4 gap-4">
            {cards.map((card) => (
              <Card
                key={card.id}
                onClick={() => handleCardClick(card)}
                className={`p-6 cursor-pointer transition-all duration-300 hover:scale-105 shadow-card
                  ${card.isMatched ? "opacity-50 gradient-secondary" : "hover:shadow-hover"}
                  ${selected.find((c) => c.id === card.id) ? "gradient-primary scale-105" : ""}
                  ${card.isMatched ? "pointer-events-none" : ""}
                `}
              >
                <div className="text-center">
                  <p className={`text-sm mb-2 ${card.isMatched || selected.find((c) => c.id === card.id) ? "text-white/70" : "text-muted-foreground"}`}>
                    {card.isEnglish ? "EN" : "UK"}
                  </p>
                  <p className={`text-lg font-semibold ${card.isMatched || selected.find((c) => c.id === card.id) ? "text-white" : "text-foreground"}`}>
                    {card.content}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
