export default function validate(validator) {
  return (request) =>
    validator
      .transform(({ files, params, query, body }) => ({
        ...(!!files && files), // Object from multer lib
        ...(!!params && params),
        ...(!!query && query),
        ...(!!body && body),
      }))
      .parse(request);
}
