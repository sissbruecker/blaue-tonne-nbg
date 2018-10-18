import os
from argparse import ArgumentParser
from datetime import datetime
from json import load

import fpdf

parser = ArgumentParser(description="Generate tour PDF files from scraped flat data JSON file")
parser.add_argument("input",
                    help="Flat JSON input file")
parser.add_argument("output",
                    help="Output folder for PDF files")

args = parser.parse_args()

print("Using flat data file: " + args.input)

# Read flat data
with open(args.input) as input_file:
    data = load(input_file)

# Generate calendar file for each tour
for tour in data:
    tour_id = tour["tour_id"]

    pdf = fpdf.FPDF()
    pdf.add_page()

    # Heading
    pdf.set_font("Arial", size=26, style="B")
    pdf.cell(200, 10, txt="", align="C")
    pdf.ln()
    pdf.ln()
    pdf.ln()
    pdf.ln()
    pdf.cell(200, 10, txt="Abfuhrtermine Blaue Tonne", align="C")

    # Sub
    sub_heading = tour["street_name"] + " - " + tour["tour_name"]
    pdf.ln()
    pdf.ln()
    pdf.set_font("Arial", size=20)
    pdf.cell(200, 10, txt=sub_heading, align="C")

    # Dates
    pdf.ln()
    pdf.ln()
    pdf.ln()
    pdf.ln()
    pdf.set_font("Arial", size=20, style="B")
    pdf.cell(200, 10, txt="Termine", align="C")
    pdf.ln()
    pdf.set_font("Arial", size=20)

    for event in tour["events"]:
        event_date = datetime.strptime(event, "%Y-%m-%d")
        date_string = event_date.strftime("%d.%m.%Y")

        pdf.cell(200, 10, txt=date_string, align="C")
        pdf.ln()

    pdf_file_name = os.path.join(args.output, tour_id + ".pdf")
    pdf.output(pdf_file_name)
