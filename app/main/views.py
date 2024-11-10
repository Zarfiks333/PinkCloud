from main.models import *
from django.shortcuts import render


from django.shortcuts import render
import vk_api
import re

def get_vk_posts():
    vk_session = vk_api.VkApi(token='210b5098210b5098210b50980522281f752210b210b509846254811585aea64acb4aafa')
    vk = vk_session.get_api()
    
    group_id = '220027850'
    group_teg = 'moredevit'
    posts = vk.wall.get(owner_id='-' + group_id, count=3, extended=1)['items']

    result = []
    for index, post in enumerate(posts):
        text_lines = post['text'].split('\n')
        title = text_lines[0]

        if index == 0:
            sentence_limit = 10
        else:
            sentence_limit = 3

        description = ''
        sentence_count = 0
        for line in text_lines[1:]:
            sentences = re.split(r'(?<!\w\.\w.)(?<![A-Z][a-z]\.)(?<=\.|\?|\!)\s', line)
            for sentence in sentences:
                description += sentence + ' '
                sentence_count += 1
                if sentence_count >= sentence_limit:
                    break
            if sentence_count >= sentence_limit:
                break

        if len(post['text']) > len(description):
            description = description.strip() + '\n...' 

        post_data = {
            'title': title,
            'description': description,
            'photos': [],
            'link': f"https://vk.com/{group_teg}?w=wall-{group_id}_{post['id']}"
        }
        
        if 'attachments' in post:
            for attachment in post['attachments']:
                if attachment['type'] == 'photo':
                    photo_data = attachment['photo']
                    photo_url = max(photo_data['sizes'], key=lambda x: x['width'])['url']
                    post_data['photos'].append(photo_url)
        
        result.append(post_data)
    
    return result


def index (request):
    
    result = get_vk_posts() 

    context = {
        'title': 'PinkCloud',
        'posts': result,
    }
    
    return render(request, 'index.html', context)


def map(request):

    context = {
        'title': 'PinkCloud | Карта',
    }
    
    return render(request,'map.html', context)

def wiki (request):
    return render(request, 'wiki.html')


from django.shortcuts import render
from main.models import Post


    