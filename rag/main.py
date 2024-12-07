from transformers import BitsAndBytesConfig, AutoModelForCausalLM
from torch import bfloat16

text_generation_model_name = "HuggingFaceH4/zephyr-7b-beta"

bnb_config = BitsAndBytesConfig(
  load_in_4bit=True,
  bnb_4bit_use_double_quant=True,
  bnb_4bit_quant_type="nf4",
  bnb_4bit_compute_dtype=bfloat16
)

model = AutoModelForCausalLM.from_pretrained(text_generation_model_name)

print('success')
