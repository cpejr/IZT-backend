const template = (body) => `
<style>
  h1 {
    font-size: 20px;
    font-weight: bold;
    font-family: Arial, sans-serif;
  }
  h2 {
    font-size: 15px;
    font-family: Arial, sans-serif;
    font-weight: 400px;
  }
</style>
<img 
  src="https://preview.redd.it/ipjd0lwzdfla1.png?width=960&crop=smart&auto=webp&v=enabled&s=e2f89f34e0a81b726e164109b775d7b1e8599909" 
  alt="My Company Logo" 
  width="50" 
  height="50"
>
${body}
`;

export default template;
