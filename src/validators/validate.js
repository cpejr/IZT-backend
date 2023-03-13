export default function validate(validator) {
  return (request) =>
    validator
      .transform(({ files, params, query, body }) => ({
        ...(!!params && params),
        ...(!!query && query),
        ...(!!body && body),
        ...(!!files && files), // Object from multer lib
      }))
      .parse(request);
}
