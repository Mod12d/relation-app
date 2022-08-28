'''
fastapiのコードを書いている。
ここでCRUD操作ができるようにする。
'''

from fastapi import FastAPI

app = FastAPI()

@app.get("/hello")
async def hello():
    return {"message": "hello world!"}