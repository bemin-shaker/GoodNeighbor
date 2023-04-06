import { signUpWithEmail } from "../backend/firebase";

//Valid credentials
test("signUpWithEmail", async () => {
  const result = await signUpWithEmail("John", "jsmith8@gmail.com", "test123");
  expect(result).toBe("success");
});

//Invalid email
test("signUpWithEmail2", async () => {
  const result = await signUpWithEmail("John", "jsmith7", "test123");
  expect(result).toBe("Error");
});
