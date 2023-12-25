import { render, screen } from '@testing-library/react';
import FAQ from './FAQ';
import { ChakraProvider } from '@chakra-ui/react';

describe('FaqAccordion', () => {
  const faqAccordionProps = {
    blok: {
      title: 'Frequently Asked Questions',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      accordionItems: [
        {
          title: 'Question 1',
          description: 'Answer 1',
        },
        {
          title: 'Question 2',
          description: 'Answer 2',
        },
      ],
      footer: [
        {
          text: 'Footer Text',
          buttons: [
            {
              text: 'Button 1',
              variant: 'primary',
              link: {
                url: 'https://example.com',
              },
            },
          ],
        },
      ],
    },
  };

  it('renders FaqAccordion component correctly', () => {
    render(
      <ChakraProvider>
        <FAQ globalData={faqAccordionProps} {...faqAccordionProps} />
      </ChakraProvider>,
    );

    expect(screen.getByText('Frequently Asked Questions')).toBeInTheDocument();
    expect(screen.getByText('Question 1')).toBeInTheDocument();
    expect(screen.getByText('Answer 1')).toBeInTheDocument();
    expect(screen.getByText('Question 2')).toBeInTheDocument();
    expect(screen.getByText('Answer 2')).toBeInTheDocument();
    expect(screen.getByText('Footer Text')).toBeInTheDocument();
    expect(screen.getByText('Button 1')).toBeInTheDocument();
    expect(screen.getByRole('link')).toHaveAttribute(
      'href',
      'https://example.com',
    );
  });
});
