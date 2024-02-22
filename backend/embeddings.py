import google.generativeai as genai
from extract_text import load_pdf
from qdrant_client import QdrantClient, models
import time

GEMINI_API_KEY = "AIzaSyCE_8JSFhrMc8e4kQE0rXo4HIpjXQ-EI0c"

genai.configure(api_key=GEMINI_API_KEY)

pages = load_pdf('research.pdf')

client = QdrantClient(
    url="https://04b10788-dd53-46fa-b2f1-3481526bd956.us-east4-0.gcp.cloud.qdrant.io:6333",
    api_key="z8UBaJQwnwdXLjxoRenqe9S-f4WsWZeVMVbAhP_dgNyPq6nSFbI2iQ",
)

collection_name = "research"
if collection_name in client.get_collections():
    client.delete_collection(collection_name)
    time.sleep(5) 

client.create_collection(
    collection_name=collection_name,
    vectors_config=models.VectorParams(
        size=768,
        distance=models.Distance.COSINE,
        on_disk=True
    ),
)

vectors = []
ids = []
for page in pages:
    result = genai.embed_content(
        model="models/embedding-001",
        content=page.page_content,
        task_type="retrieval_document",
    )

    vectors.append(result["embedding"])
    ids = ids.append(len(result["embedding"]))

client.upsert(
    collection_name="{collection_name}",
    points=models.Batch(
        ids=ids,
        payloads=[
        ],
        vectors=vectors,
    ),
)