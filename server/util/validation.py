import hashlib


def hash_password_sha2(password):
    return hashlib.sha256(password.encode()).hexdigest()


def check_password_sha2(stored_hash, password):
    return stored_hash == hash_password_sha2(password)

def empty_data(*data): 
  return True if '' in data else False




     
     
