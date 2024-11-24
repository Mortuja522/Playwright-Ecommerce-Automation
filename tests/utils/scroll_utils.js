async function scrollToElement(page, selector) {
    await page.locator(selector).evaluate((element) => {
      const elementRect = element.getBoundingClientRect();
      window.scrollTo({
        top: elementRect.top + window.scrollY - window.innerHeight / 2 + elementRect.height / 2,
        behavior: 'smooth',
      });
    });
  }
  
  module.exports = { scrollToElement };
  