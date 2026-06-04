text = "Punjab announces winter vacation for schools.."
text_lower = text.lower()

fake_count = 0

print(f"Text: {text_lower}")
print(f"Contains '..'? {'..' in text_lower}")

if ".." in text_lower:
    fake_count += 1
    print("✅ Found '..' - Adding 1 to fake_count")

print(f"Final fake_count: {fake_count}")

if fake_count > 0:
    print("RESULT: FAKE")
else:
    print("RESULT: REAL")