export default function validate(validator) {
  return (request) =>
    validator
      .transform(({ params, query, body }) => ({
        ...(!!params && params),
        ...(!!query && query),
        ...(!!body && body),
      }))
      .parse(request);
}
