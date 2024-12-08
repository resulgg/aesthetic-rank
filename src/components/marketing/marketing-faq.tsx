import { TypographyH2 } from "@/components/typography/typography-h2";
import { TypographyP } from "@/components/typography/typography-p";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ_ITEMS = [
  {
    question: "How does the aesthetic ranking system work?",
    answer:
      "Our AI analyzes your physique and assigns you one of seven tiers from Iron to Supreme based on multiple factors including body proportions, symmetry, skeletal structure, and overall aesthetics. Each tier represents a different level of aesthetic achievement based on classical standards of beauty and harmony.",
  },
  {
    question: "Will my photos be used for AI training?",
    answer:
      "No, your photos will not be used for AI training purposes. We respect your privacy and data rights. Your photos are only used for generating your personal analysis report and are processed securely by our existing AI system. They are not used to train or improve our AI models. You can delete your analysis, photos, or entire account at any time.",
  },
  {
    question: "How accurate is the AI analysis?",
    answer:
      "Our AI system uses advanced computer vision technology to provide objective measurements and assessments based on established aesthetic criteria. While we acknowledge that no AI system is perfect, we continuously work to minimize errors and provide the most accurate analysis possible through rigorous testing and validation.",
  },
  {
    question: "How long does the analysis take?",
    answer:
      "After submitting your information and photos, you'll receive your comprehensive analysis report within 60 seconds. Our AI processes the images quickly to provide you with detailed results during this waiting period.",
  },
  {
    question: "Is my data kept private?",
    answer:
      "Yes, absolutely. Your photos and personal information are processed securely by our AI system. You can choose to make your analysis public or keep it private. If you make it public, your analysis will be visible to everyone and will appear in the public ranking.",
  },
  {
    question: "Are refunds available after the analysis is generated?",
    answer:
      "Due to the high computational power required by our AI system to generate detailed analyses, we cannot offer refunds once payment is made. The analysis process begins immediately after payment and consumes significant computing resources. However, if you experience any technical issues during your analysis (such as getting stuck on the loading screen or results not displaying), we offer a 100% refund or free re-analysis. If you believe there are errors in your results, please don't hesitate to contact us and we'll be happy to review your case.",
  },
  {
    question: "Can I delete my analysis, photos, or entire account?",
    answer:
      "Yes, you can delete your analysis, photos, or entire account at any time. If you delete your analysis, it will be removed from the rankings. We prioritize your privacy and data security.",
  },
  {
    question: "How can I contact support if I have an issue?",
    answer:
      "If you encounter any problems or have questions, you can reach our support team at aestheticrank@gmail.com. Our team typically responds within 24 hours on business days.",
  },
];

export const MarketingFaq = () => {
  return (
    <section className="space-y-8">
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <TypographyH2>Frequently Asked Questions</TypographyH2>
        <TypographyP className="text-muted-foreground">
          Find answers to common questions about our AI physique analysis system
        </TypographyP>
      </div>

      <Accordion
        type="single"
        collapsible
        className="max-w-3xl mx-auto px-4 py-2 rounded-lg"
      >
        {FAQ_ITEMS.map((item, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger className="text-left">
              {item.question}
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              {item.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
};

export default MarketingFaq;
