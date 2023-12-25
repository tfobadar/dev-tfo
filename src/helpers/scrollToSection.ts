export const scrollToSection = (sectionId: string, offsetTop: number = 216) => {
  const section = document.getElementById(sectionId);
  const scrollPosition = section?.offsetTop && section?.offsetTop - offsetTop;
  window.scrollTo({
    top: scrollPosition,
    behavior: 'smooth',
  });
};
