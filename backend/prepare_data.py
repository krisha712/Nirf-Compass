"""
Run once to generate data/nirf_data_updated.csv
Usage: python prepare_data.py
"""
import pandas as pd
import re
import os

BASE = os.path.dirname(__file__)

nirf_df = pd.read_csv(os.path.join(BASE, "data", "nirf_data.csv"))
all_df  = pd.read_csv(os.path.join(BASE, "data", "all_univrsities.csv"))

# Keep only useful columns from all_df
all_df = all_df[["proper_university", "type", "State"]].copy()
all_df.columns = ["University", "Type", "State"]

def clean_name(name):
    if not isinstance(name, str):
        return ""
    name = name.lower().strip()
    name = re.sub(r"['\",\.\-\(\)]", " ", name)
    name = name.replace("indian institute of technology", "iit")
    name = name.replace("national institute of technology", "nit")
    name = name.replace("all india institute of medical sciences", "aiims")
    name = name.replace("indian institute of science", "iisc")
    name = name.replace("jawaharlal nehru university", "jnu")
    name = name.replace("university", "univ")
    name = name.replace("institute", "inst")
    name = " ".join(name.split())
    return name

nirf_df["clean_name"] = nirf_df["university"].apply(clean_name)
all_df["clean_name"]  = all_df["University"].apply(clean_name)

# Merge on cleaned names
merged_df = nirf_df.merge(
    all_df[["clean_name", "Type", "State"]],
    on="clean_name",
    how="left"
)

# Fill unmatched
merged_df["Type"]  = merged_df["Type"].fillna("Private")
merged_df["State"] = merged_df["State"].fillna("Unknown")

# Drop helper column
merged_df.drop(columns=["clean_name"], inplace=True)

out_path = os.path.join(BASE, "data", "nirf_data_updated.csv")
merged_df.to_csv(out_path, inplace=False, index=False)
print(f"Saved {len(merged_df)} rows to {out_path}")
print(merged_df[["university", "Type", "State"]].head(10).to_string())
