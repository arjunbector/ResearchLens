from docx2pdf import convert

convert("research.docx")
import os

def delete_file(file_path):
    # Check if file exists
    if os.path.isfile(file_path):
        os.remove(file_path)  # Delete the file
        print(f"File {file_path} has been deleted.")
    else:
        print(f"File {file_path} does not exist.")

delete_file('research.docx')
delete_file('research_paper.docx')
delete_file('3542.pdf')