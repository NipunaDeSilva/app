export function validateEmail(email: string) {
  return (
    email.includes("@") &&
    email.includes(".com")
  );
}