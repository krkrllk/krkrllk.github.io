import { useState, useEffect } from "react";
import { wordPairs } from "@/data/words";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, RotateCcw, Trophy, Eye } from "lucide-react";
import { toast } from "sonner";

interface MemoryGameProps {
  onBack: () => void;
}

interface MemoryCard {
  id: string;
  content: string;
  pairId: number;
  isFlipped: boolean;
  isMatched: boolean;
}

export const MemoryGame = ({ onBack }: MemoryGameProps) => {
  const [cards, setCards] = useState<MemoryCard[]>([]);
  const [flippedCards, setFlippedCards] = useState<MemoryCard[]>([]);
  const [moves, setMoves] = useState(0);
  const [matches, setMatches] = useState(0);
  const [isChecking, setIsChecking] = useState(false);

  const initializeGame = () => {
    const gameWords = wordPairs.slice(0, 8);
    const newCards: MemoryCard[] = [];

    gameWords.forEach((word) => {
      newCards.push(
        {
          id: `${word.id}-en`,
          content: word.english,
          pairId: word.id,
          isFlipped: false,
          isMatched: false,
        },
        {
          id: `${word.id}-uk`,
          content: word.ukrainian,
          pairId: word.id,
          isFlipped: false,
          isMatched: false,
        }
      );
    });

    setCards(newCards.sort(() => Math.random() - 0.5));
    setFlippedCards([]);
    setMoves(0);
    setMatches(0);
  };

  useEffect(() => {
    initializeGame();
  }, []);

  useEffect(() => {
    if (flippedCards.length === 2) {
      setIsChecking(true);
      setMoves(moves + 1);

      if (flippedCards[0].pairId === flippedCards[1].pairId) {
        toast.success("Perfect match! 🎉");
        setCards(
          cards.map((card) =>
            card.pairId === flippedCards[0].pairId
              ? { ...card, isMatched: true }
              : card
          )
        );
        setMatches(matches + 1);
        setFlippedCards([]);
        setIsChecking(false);
      } else {
        setTimeout(() => {
          setCards(
            cards.map((card) =>
              flippedCards.find((fc) => fc.id === card.id)
                ? { ...card, isFlipped: false }
                : card
            )
          );
          setFlippedCards([]);
          setIsChecking(false);
        }, 1000);
      }
    }
  }, [flippedCards]);

  const handleCardClick = (card: MemoryCard) => {
    if (
      isChecking ||
      card.isFlipped ||
      card.isMatched ||
      flippedCards.length === 2
    ) {
      return;
    }

    const newCards = cards.map((c) =>
      c.id === card.id ? { ...c, isFlipped: true } : c
    );
    setCards(newCards);
    setFlippedCards([...flippedCards, { ...card, isFlipped: true }]);
  };

  const isWon = matches === 8;

  return (
    <div className="min-h-screen p-6 animate-slide-up">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <Button onClick={onBack} variant="outline" size="lg" className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
          <h1 className="text-4xl font-bold gradient-primary bg-clip-text text-transparent">
            Memory Game
          </h1>
          <Button onClick={initializeGame} variant="outline" size="lg" className="gap-2">
            <RotateCcw className="w-4 h-4" />
            New Game
          </Button>
        </div>

        <div className="flex justify-center gap-8 mb-8 text-xl">
          <div className="text-center">
            <p className="text-muted-foreground">Moves</p>
            <p className="text-3xl font-bold gradient-primary bg-clip-text text-transparent">
              {moves}
            </p>
          </div>
          <div className="text-center">
            <p className="text-muted-foreground">Matches</p>
            <p className="text-3xl font-bold gradient-secondary bg-clip-text text-transparent">
              {matches}/8
            </p>
          </div>
        </div>

        {isWon ? (
          <Card className="p-12 text-center shadow-card gradient-primary animate-bounce-in">
            <Trophy className="w-24 h-24 mx-auto mb-4 text-white" />
            <h2 className="text-4xl font-bold text-white mb-4">Congratulations!</h2>
            <p className="text-white/90 text-2xl mb-2">
              You completed the game in {moves} moves!
            </p>
            <p className="text-white/80 mb-6">
              {moves <= 20 ? "Incredible memory! 🧠" : moves <= 30 ? "Great job! 🌟" : "Well done! 👏"}
            </p>
            <Button onClick={initializeGame} size="lg" variant="outline" className="gap-2">
              <RotateCcw className="w-4 h-4" />
              Play Again
            </Button>
          </Card>
        ) : (
          <div className="grid grid-cols-4 md:grid-cols-4 gap-4">
            {cards.map((card) => (
              <Card
                key={card.id}
                onClick={() => handleCardClick(card)}
                className={`aspect-square cursor-pointer transition-all duration-500 shadow-card hover:shadow-hover
                  ${card.isFlipped || card.isMatched ? "gradient-primary" : "bg-muted"}
                  ${!card.isFlipped && !card.isMatched ? "hover:scale-105" : ""}
                `}
                style={{
                  transformStyle: "preserve-3d",
                  transform: card.isFlipped || card.isMatched ? "rotateY(180deg)" : "rotateY(0deg)",
                }}
              >
                <div className="w-full h-full flex items-center justify-center p-4">
                  {!card.isFlipped && !card.isMatched ? (
                    <Eye className="w-8 h-8 text-muted-foreground" />
                  ) : (
                    <p
                      className="text-lg font-bold text-white text-center"
                      style={{ transform: "rotateY(180deg)" }}
                    >
                      {card.content}
                    </p>
                  )}
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
