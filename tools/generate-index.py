from argparse import ArgumentParser
from json import load, dump

parser = ArgumentParser(description="Generate street index JSON file from scraped flat data JSON file")
parser.add_argument("input",
                    help="Flat JSON input file")
parser.add_argument("output",
                    help="JSON index output file")

args = parser.parse_args()

print("Using flat data file: " + args.input)

# Read flat data
with open(args.input) as input_file:
    data = load(input_file)

# Aggregate tours into streets
streets = {}

for entry in data:
    street_id = entry["street_id"]

    # Get or create street
    street = streets.get(street_id)

    if street is None:
        street = {
            "street_id": street_id,
            "street_name": entry["street_name"],
            "tours": []
        }
        streets[street_id] = street

    # Add tour
    tour = {
        "tour_id": entry["tour_id"],
        "tour_name": entry["tour_name"],
    }

    street["tours"].append(tour)

# Write to output
print("Writing to index file: " + args.output)

street_list = list(streets.values())

with open(args.output, 'w', encoding='utf8') as output_file:
    dump(street_list, output_file, ensure_ascii=False)
