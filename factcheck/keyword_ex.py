import spacy

nlp = spacy.load("en_core_web_sm")

def extract(text):
    doc = nlp(text)
    out = []
    for ent in doc.ents:
        out.append(ent.text)
    return out

if __name__== '__main__':
    text = "When the citizens observe any issues in their community or if they have any suggestions, they will use CIGMA to raise a service request that will be sent to the administrative authorities of the council. This service request will include details like exact location of the issue (by leveraging google maps API), description, date, images etc. The council admin will be able to quickly narrow down on the issue and identify a remediation. After approvals from Councilor, required resolution will be provided. In future releases, CIGMA will be integrated with 3rd party contract systems to track end to end resolution."
    print(extract(text))
