from PIL import Image
import io
import google.generativeai as genai

genai.configure(api_key="AIzaSyCE_8JSFhrMc8e4kQE0rXo4HIpjXQ-EI0c")

model = genai.GenerativeModel('gemini-pro-vision')

def image_analysis():
    img = Image.open('C:/Users/harsh/Desktop/researchlens/context_image1.png')
    res = model.generate_content([f'Read the image find all the possible details in this and then if its a graph give good analysis that is useful. make sure to give only useful information',img])
    return(res.candidates[0].content.parts[0].text)
