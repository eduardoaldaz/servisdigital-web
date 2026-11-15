import type { Metadata } from 'next';
import { PageHero } from '@/components/page-hero';
import { ProductPanels } from '@/components/productos';
import { CtaBand } from '@/components/bloques';
import { Container, H2, Lead, Section } from '@/components/ui';

export const metadata: Metadata = {
  title: 'Productos',
  description: 'FacServis, facturación electrónica del SRI en Ecuador, y DocusAI, captura de facturas con IA en España. Productos de Servis Digital.',
  alternates: { canonical: '/productos' },
};

export default function ProductosPage() {
  return (
    <>
      <PageHero
        migas={[{ href: '/productos', label: 'Productos' }]}
        titulo="Nuestros productos, nuestra mejor carta de presentación."
        texto="Construimos y operamos software propio con IA. Cada uno resuelve un proceso concreto para un mercado concreto, y todo lo que aprendemos con ellos llega a los proyectos de nuestros clientes."
      />
      <Section>
        <Container>
          <ProductPanels />
        </Container>
      </Section>
      <Section tono="blanco" aria-labelledby="medida">
        <Container className="grid gap-8 lg:grid-cols-2 lg:gap-20">
          <H2 id="medida">¿Necesitas algo parecido, pero para tu proceso?</H2>
          <div>
            <Lead>
              FacServis y DocusAI nacieron igual que un proyecto a medida: un proceso concreto que alguien hacía a mano. Si el tuyo no encaja en un producto que ya existe, lo construimos con el mismo equipo y la misma tecnología.
            </Lead>
          </div>
        </Container>
      </Section>
      <CtaBand />
    </>
  );
}
