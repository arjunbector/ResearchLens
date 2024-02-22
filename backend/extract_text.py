import fitz
import base64
import io

pdf_bytes = base64.b64decode(base64_pdf)
with open("output.pdf", "wb") as f_out:
    f_out.write(pdf_bytes)

def extract_text_from_pdf(pdf_path):
    pdf_document = fitz.open(pdf_path)
    page_texts = []
    for page_num in range(pdf_document.page_count):
        page = pdf_document.load_page(page_num)
        
        text = page.get_text()
        
        page_texts.append(text)
    
    pdf_document.close()
    
    return page_texts