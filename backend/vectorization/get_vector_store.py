from pinecone import Pinecone, PodSpec
from ..pdf_processing.extract_text import extract_text_from_pdf
from vectorize import create_embeds
import numpy as np

pc = Pinecone(api_key="9700a57b-5f74-475e-b556-2cd1b75f494f")

texts = extract_text_from_pdf('backend\\research.pdf')

embeds = create_embeds(texts)

shape = np.array(embeds).shape

index_name = 'researchlens'

if 'my_index' not in pc.list_indexes().names():
    pc.create_index(
        name=index_name,
        dimension=shape[1],
        metric='euclidean',
        spec=PodSpec(
            environment="gcp-starter"
        ))

index = pc.Index(index_name)

batch_size = 128

ids = [str(i) for i in range(shape[0])]

metadata = [{"page_number": i, "original_text": texts[i]} for i in range(shape[0])]

to_upsert = list(zip(ids, embeds, metadata))

for i in range(0, shape[0], batch_size):
    i_end = min(i+batch_size, shape[0])
    index.upsert(vectors=to_upsert[i:i_end])

print(index.describe_index_stats())