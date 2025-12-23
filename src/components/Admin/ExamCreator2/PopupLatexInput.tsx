
import React, { useState, useEffect, ChangeEvent, useRef } from "react";
import { MathJax, MathJaxContext } from "better-react-mathjax";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

// const mathJaxConfig = {
//   tex: {
//     inlineMath: [
//       ["$", "$"],
//       ["\(", "\)"],
//     ],
//     displayMath: [
//       ["$$", "$$"],
//       ["\[", "\]"],
//     ],
//     processEscapes: true,
//   },
//   options: {
//     enableMenu: false,
//   },
//   startup: {
//     typeset: true,
//   },
// };

interface LatexHelper {
  label: string;
  insert: string;
}

const latexHelpers: LatexHelper[] = [
  { label: "Fraction", insert: "\\frac{a}{b}" },
  { label: "Square Root", insert: "\\sqrt{x}" },
  { label: "Exponent", insert: "x^{n}" },
  { label: "Subscript", insert: "x_{i}" },
  { label: "Integral", insert: "\\int_{a}^{b} f(x) dx" },
  { label: "Sum", insert: "\\sum_{i=1}^{n} x_i" },
  {
    label: "Matrix",
    insert: "\\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix}",
  },
];

interface LatexEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialValue: string;
  onSave: (value: string) => void;
}

export const LatexEditor: React.FC<LatexEditorModalProps> = ({
  isOpen,
  onClose,
  initialValue,
  onSave,
}) => {
  const [latexInput, setLatexInput] = useState<string>(initialValue);
  const modalRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    setLatexInput(initialValue);
  }, [initialValue, isOpen]);

  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setLatexInput(e.target.value);
  };

  const insertLatexHelper = (helperText: string) => {
    const textArea = document.getElementById(
      "latex-editor-modal"
    ) as HTMLTextAreaElement;
    if (!textArea) return;

    const start = textArea.selectionStart;
    const end = textArea.selectionEnd;

    const textBefore = latexInput.substring(0, start);
    const textAfter = latexInput.substring(end);

    const insertText = `$${helperText}$`;
    const newText = textBefore + insertText + textAfter;

    setLatexInput(newText);

    setTimeout(() => {
      textArea.focus();
      const newCursorPos = start + insertText.length;
      textArea.setSelectionRange(newCursorPos, newCursorPos);
    }, 0);
  };
  const handleSave = () => {
    onSave(latexInput);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div
        ref={modalRef}
        className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col"
      >
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-semibold">LaTeX Editor</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x overflow-auto">
          <div className="flex-1 p-4 flex flex-col min-h-[300px]">
            <div className="flex flex-wrap gap-2 mb-4">
              {latexHelpers.map((helper, index) => (
                <Button
                  key={index}
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => insertLatexHelper(helper.insert)}
                  className="text-xs"
                >
                  {helper.label}
                </Button>
              ))}
            </div>

            <Textarea
              id="latex-editor-modal"
              value={latexInput}
              onChange={handleInputChange}
              placeholder="Enter your LaTeX here... (Use $ symbols to wrap LaTeX expressions)"
              className="flex-1 min-h-0 font-mono resize-none"
              autoFocus
            />

            <div className="text-xs text-gray-500 mt-2">
              <p>Inline math: $expression$ or $$expression$$</p>
            </div>
          </div>

          <div className="flex-1 p-4 flex flex-col min-h-[300px]">
            <h3 className="font-medium mb-2">Preview</h3>
            <div className="flex-1 p-4 border rounded-md bg-gray-50 overflow-auto">
              {isOpen && latexInput ? (
                <MathJax inline dynamic>{latexInput}</MathJax>
              ) : (
                <p className="text-gray-400 italic">
                  Preview will appear here...
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="p-4 border-t flex justify-end gap-2">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Apply</Button>
        </div>
      </div>
    </div>
  );
};
