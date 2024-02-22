import cohere

co = cohere.Client("t0Mx5tqf3LUES4txS8wBJoy59SqbEGG0t2s23geS")

def create_embeds(texts: list[str]):
    embeds = co.embed(
        texts=texts,
        model='embed-english-v3.0',
        input_type='search_document',
        truncate='END'
    ).embeddings
    return embeds