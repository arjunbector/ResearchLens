import pdfplumber

def extract_text_from_pdf(file_path):
    with pdfplumber.open(file_path) as pdf:
        text = ''
        page = pdf.pages[1]
        width = page.width
        height = page.height

        left_half = page.crop((0, 0, width / 2, height))
        left_text = left_half.extract_text()

        right_half = page.crop((width / 2, 0, width, height))
        right_text = right_half.extract_text()

        text += left_text + "\n" + right_text

        return text

file_path = 'RPaper1.pdf' 
text = extract_text_from_pdf(file_path)
print(f"Text: {text}")