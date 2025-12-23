"use client";
import { MathJax, MathJaxContext } from "better-react-mathjax";

export default function MathComponent() {
  return (
    <MathJaxContext>
      <div className="p-4">
        <h2 className="text-xl font-bold">Math Formula</h2>
        <p className="flex flex-col space-y-4">
          <MathJax inline>{"\\(S_1>S_2>S_3>S_4 \\)"}</MathJax>
          <MathJax inline>{"\\(Inline: ∆x×∆p ≥  h/4π	 \\)"}</MathJax>
          <MathJax inline>{"\\(Inline: O(g) → O^{2─}(g) \\)"}</MathJax>
        </p>
      </div>
    </MathJaxContext>
  );
}
