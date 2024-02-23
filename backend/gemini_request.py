import google.generativeai as genai
from vector_search import vector_search
from pdfex import extract_data_from_pdf
from PIL import Image
from io import BytesIO

genai.configure(api_key="AIzaSyCE_8JSFhrMc8e4kQE0rXo4HIpjXQ-EI0c")


def image_text(query):
    
    res =  vector_search(query)
    context = ''
    page_number = []
    for match in res['matches']:
        context +=  (match['metadata']['original_text'])
        page_number.append(int(match['metadata']['page_number']))

    realted_images = []

    for i in page_number:
        i = int(i)
        if i == 0:
            i = 1
        image_list = extract_data_from_pdf('backend/RPaper2.pdf', start_page=i, end_page=i, extract_images=True, extract_text=False, save_images=False, image_save_path='', online_pdf=False)
        for image in image_list[0]:
            realted_images.append(image[1])

    model1 = genai.GenerativeModel('gemini-pro-vision')

    relevance_scores = [0,]

    for image in realted_images:
        image_pil = Image.open(BytesIO(image))
        res = model1.generate_content([f'Rate this image on scale of 0 to 100 in relevance to the following query {query} and do not describe the image at all, give only numerical output',image_pil])
        try:
            relevance_scores.append(int(res.candidates[0].content.parts[0].text.strip()))
        except:
            pass
    print(relevance_scores)	
    max_score = max(relevance_scores)
    if(max_score>60):
        max_score_index = relevance_scores.index(max_score)
        context_image = realted_images[min(max_score_index-1, len(realted_images)-2)]

        with open('context_image.png', 'wb') as f:
            f.write(context_image)

    prompt = f'''
    Answer any query asked in detail and only and only from the context passed below and nothing else at all. make sure to not add any other data and answer as accurately as possible to the context passed below. Add a feature to summarize the entire document if the query in any way suggests this. make sure to do this only if the query suggets this.
    Context: {context}
    Query: {query}
    '''

    model = genai.GenerativeModel('gemini-pro')
    chat = model.start_chat(history=[])

    response = model.generate_content(prompt)

    return (response.candidates[0].content.parts[0].text)