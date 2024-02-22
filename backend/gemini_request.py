import google.generativeai as genai
from vectorization.vector_search import vector_search

query = input("Enter a question based on the paper: ")

res = vector_search(query)

context = ''

for match in res['matches']:
    context +=  (match['metadata']['original_text'])

prompt = f'''
Answer any query asked only and only from the context passed below and nothing else at all. make sure to not add any other data and answer as accurately as possible to the context passed below.
Context: {context}
Query: {query}
'''

genai.configure(api_key="AIzaSyCE_8JSFhrMc8e4kQE0rXo4HIpjXQ-EI0c")

model = genai.GenerativeModel('gemini-pro')

response = model.generate_content(prompt)

print(response.candidates[0].content.parts[0].text)