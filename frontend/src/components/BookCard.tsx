import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface BookCardProps {
  title: string;
  author: string;
  isbn: string;
  onDelete?: () => void;
}

export default function BookCard({ title, author, isbn, onDelete }: BookCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="w-full max-w-xs shadow-md hover:shadow-lg transition">
        <CardContent className="flex flex-col gap-2 p-4">
          <div className="font-semibold text-lg">{title}</div>
          <div className="text-sm text-neutral-600 dark:text-neutral-300">{author}</div>
          <div className="text-xs text-neutral-400">ISBN: {isbn}</div>
          {onDelete && (
            <Button variant="destructive" className="mt-2" onClick={onDelete} aria-label="Delete book">
              Delete
            </Button>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
