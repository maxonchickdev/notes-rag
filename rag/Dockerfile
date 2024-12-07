FROM python:3

WORKDIR /usr/src/app

COPY requirements.txt main.py ./

RUN pip install -q -r requirements.txt

RUN pip install -q --pre torch torchvision torchaudio --index-url https://download.pytorch.org/whl/nightly/cpu

CMD [ "python", "main.py" ]
