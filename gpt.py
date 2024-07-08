import json

def read_json_and_write_to_md(input_file_path, output_directory):
    try:
        # Read the JSON file
        with open(input_file_path, 'r') as json_file:
            data = json.load(json_file)

        # Iterate through each object in the JSON data
        item_id = 0
        content = ''
        for item in data:
            role = item.get('role')  # Replace 'item_id' with the actual key for the item ID
            #print(role, item_id)
            #content = item.get('content')
            content_text = item.get('content')[0]['text']

            if role == 'user':
                content = '## Question' + "\n\n" + content_text + "\n\n" + '## Answer' + "\n\n"  # Replace 'content' with the actual key for the content
                continue

            content += content_text  # Replace 'content' with the actual key for the content
            item_id += 1

            #print(role, item_id, content)
            # Create a new Markdown file
            create_md_file(f"{output_directory}/{item_id}.md", content)

    except FileNotFoundError:
        print(f"Error: File '{input_file_path}' not found.")

def create_md_file(output_file_path, content):
    with open(output_file_path, 'w') as md_file:
        md_file.write(content)

    print(f"Created {output_file_path}")

# Example usage
input_file_path = 'gpt.json'
output_directory = '.'
read_json_and_write_to_md(input_file_path, output_directory)
