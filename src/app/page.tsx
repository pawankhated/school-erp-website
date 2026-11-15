import { Boards, CtaBand, FeatureGrid, Hero, HomeFaq, HowItWorks, Numbers, PricingTeaser, Roles, SmartLearning, Trust } from '@/components/home';
import { Container, SectionTitle } from '@/components/ui';

export default function Home() {
  return (
    <>
      <Hero />
      <Boards />
      <Roles />
      <FeatureGrid />
      <Numbers />
      <SmartLearning />
      <Trust />
      <HowItWorks />
      <PricingTeaser />
      <section className="py-16">
        <Container>
          <SectionTitle eyebrow="Questions" title="Good questions, simple answers" />
          <HomeFaq />
        </Container>
      </section>
      <CtaBand />
    </>
  );
}
