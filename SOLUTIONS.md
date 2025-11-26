# PROJECT BLACKMIRROR - Solutions

This file contains the complete solutions to all 10 levels.

## How to Decrypt

The solutions are AES-256-CBC encrypted with PBKDF2 key derivation.

**Password:** Contact the challenge creator for the decryption password, or prove you've completed the challenge.

### Using OpenSSL (macOS/Linux)

```bash
# Decode from base64, then decrypt
base64 -d -i solutions_encrypted_data.txt | openssl enc -aes-256-cbc -d -pbkdf2
```

You will be prompted for the password.

### Using Online Tools

1. Copy the contents of `solutions_encrypted_data.txt`
2. Base64 decode it first
3. Then AES-256-CBC decrypt with PBKDF2 key derivation

---

## Why Password Protected?

Solving the challenge yourself is far more rewarding than reading the answers.

If you're stuck, try these first:
- Re-read all files carefully
- Check for hidden metadata
- Use the terminal commands
- Look for patterns across documents
- Some files have hidden layers

Good luck, investigator.
