import fitz  # PyMuPDF
from wit import *

def extract_data_from_pdf(pdf_path, start_page, end_page, extract_images=True, extract_text=True, save_images=False, image_save_path=None):
    extracted_data = []
    pdf_document = fitz.open(pdf_path)
    for page_number in range(start_page - 1, min(end_page, len(pdf_document))):
        page_data = []
        if extract_text:
            page_text = pdf_document[page_number].get_text()
            page_data.append(['t', page_text])

        if extract_images:
            image_list = pdf_document[page_number].get_images(full=True)

            for image_index, img in enumerate(image_list):
                xref = img[0]

                base_image = pdf_document.extract_image(xref)
                image_bytes = base_image["image"]

                if save_images:
                    # Save the image locally
                    image_filename = f"{pdf_path}_page_{page_number + 1}_image_{image_index + 1}.png"
                    if image_save_path:
                        image_filename = image_save_path + "/" + image_filename
                    with open(image_filename, "wb") as image_file:
                        image_file.write(image_bytes)

                page_data.append(['i', image_bytes])

        extracted_data.append(page_data)

    pdf_document.close()

    return extracted_data

extracted_data = extract_data_from_pdf('backend/try.pdf', 5, 9, True, True, True, '')

for item in extracted_data:
    for data_type, data in item:
        if data_type == 't':
            print(restructure_prompt(data,'hi'))