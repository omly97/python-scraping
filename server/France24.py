from bs4 import BeautifulSoup
import requests

class France24():

    def __init__(self) -> None:
        self.france24 = "https://www.france24.com"


    def fetch_data_from_url(self, url: str) -> BeautifulSoup:
        headers = {'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.12; rv:55.0) Gecko/20100101 Firefox/55.0'}
        res = requests.get(url, headers=headers)
        return BeautifulSoup(res.text, "html.parser")


    def __get_post_images(self, html_data: BeautifulSoup):
        return {src.split(' ')[1] : src.split(' ')[0] for src in html_data.find("a").find("img")['srcset'].split(',')}


    def __get_post_item(self, html_data: BeautifulSoup):
        return {
            "link" : html_data.find("a")['href'],
            "tag": html_data.find("span", "a-tag__wrapper").text if html_data.find("span", "a-tag__wrapper") != None else None,
            "title" : html_data.find("p", "article__title").text,
            "images": self.__get_post_images(html_data),
        }


    def __get_data__section_MAIN(self, html_data: BeautifulSoup):
        class_n1 = "o-layout-list o-banana-split__main-articles"
        class_n11 = "o-layout-list__item o-layout-list__item--main-item"
        class_n12 = "o-layout-list__item l-m-100 l-t-50 l-d-50"
        class_n2 = "o-block-ad-n-newsfeed o-banana-split__ad-n-newsfeed"
        return {
            "main_post": self.__get_post_item(html_data.find("div", class_n1).find("div", class_n11)),
            "list_post": [self.__get_post_item(data_item) for data_item in html_data.find("div", class_n1).find_all("div", class_n12)]
        }


    def __get_data__section_LIST_LAYOUT(self, html_data: BeautifulSoup, class_list: str, class_list_item:str):
        return [self.__get_post_item(data) for data in html_data.find("div", class_list).find_all("div", class_list_item)]


    def __get_data__section_LR_LAYOUT(self, html_data: BeautifulSoup):
        class_n1 = "o-aside-content__row o-aside-content__row--center"
        class_n2 = "m-item-list-article m-item-list-article--highlighted-main"
        class_n3 = "o-layout-list o-layout-list--highlighted"
        class_n4 = "o-aside-content__row o-aside-content__row--flex-end"
        return {
            "title": html_data.find("div", class_n1).find("span", "a-aside-title__content").text,
            "main_post": self.__get_post_item(html_data.find("div", class_n2)),
            "list_post": self.__get_data__section_LIST_LAYOUT(html_data=html_data, class_list=class_n3, class_list_item="o-layout-list__item l-m-100 l-t-100 l-d-100"),
            "link_others": self.france24 + html_data.find("div", class_n4).find("a")["href"]
        }


    def __get_data__section_GRID_LAYOUT(self, html_data: BeautifulSoup):
        class_n1 = "o-aside-content__row o-aside-content__row--center"
        class_n2 = "o-layout-list"
        class_n3 = "o-aside-content__row o-aside-content__row--flex-end"
        return {
            "title": html_data.find("div", class_n1).find("span", "a-aside-title__content").text,
            "list_post": self.__get_data__section_LIST_LAYOUT(html_data=html_data, class_list=class_n2, class_list_item="o-layout-list__item l-m-100 l-t-50 l-d-33"),
            "link_others": self.france24 + html_data.find("div", class_n3).find("a")["href"]
        }


    def welcome_page(self):
        url = f"{self.france24}/fr"
        soup_data = self.fetch_data_from_url(url)
        data = soup_data.find_all("section", "t-content__section-pb")
        return {
            "section_1": self.__get_data__section_MAIN(html_data=data[0]), # MAIN
            "section_2": self.__get_data__section_LR_LAYOUT(html_data=data[1]),
            "section_3": self.__get_data__section_LIST_LAYOUT(html_data=data[2], class_list="o-layout-list", class_list_item="o-layout-list__item l-m-100 l-t-50 l-d-33"),
            "section_4": self.__get_data__section_LR_LAYOUT(html_data=data[3]),
            "section_5": self.__get_data__section_LIST_LAYOUT(html_data=data[4], class_list="o-layout-list", class_list_item="o-layout-list__item l-m-100 l-t-50 l-d-50"),
            "section_6": self.__get_data__section_LR_LAYOUT(html_data=data[5]),
            "section_7": self.__get_data__section_LIST_LAYOUT(html_data=data[6], class_list="o-layout-list", class_list_item="o-layout-list__item l-m-100 l-t-50 l-d-50"),
            "section_8": self.__get_data__section_LR_LAYOUT(html_data=data[7]),
            # "section_9": self.__get_data__section_LIST_LAYOUT(html_data=data[8], class_list="o-layout-list  o-layout-list--without-images", class_list_item="o-layout-list__item l-m-100 l-t-50 l-d-50"),
            "section_10": self.__get_data__section_GRID_LAYOUT(html_data=data[9]), # AFRIQUE
            "section_11": self.__get_data__section_GRID_LAYOUT(html_data=data[10]), # TECH
            "section_12": self.__get_data__section_GRID_LAYOUT(html_data=data[11]), # SPORTS
            "section_13": self.__get_data__section_GRID_LAYOUT(html_data=data[12]), # ENVIRONNEMENTS
            "section_14": self.__get_data__section_GRID_LAYOUT(html_data=data[13]), # SPONSORISES
            "section_15": self.__get_data__section_GRID_LAYOUT(html_data=data[14]), # PARTENARIAT
        }


    def __get__data__ARTICLE_CONTENT(self, html_data: BeautifulSoup):
        return {
            "title": html_data.find("h1", "t-content__title a-page-title").text,
            "images": {src.split(' ')[1] : src.split(' ')[0] for src in html_data.find("img")['srcset'].split(',')},
            "excerpt": html_data.find("p", "t-content__chapo").text,
            "content": html_data.find("div", "t-content__body u-clearfix").text
        }


    def __get__data__ARTICLE_SUGGEST(self, html_data: BeautifulSoup):
        return {
            "title": html_data.find("span", "a-aside-title__content").text,
            "posts": self.__get_data__section_LIST_LAYOUT(html_data, class_list="o-layout-list", class_list_item="o-layout-list__item l-m-100 l-t-50 l-d-50"),
        }


    def article_page(self, url):
        soup_data = self.fetch_data_from_url(f"{self.france24}{url}")
        article_data = soup_data.find("article")
        suggest_article = soup_data.find("div", "t-content__list-content")
        return {
            "main_post": self.__get__data__ARTICLE_CONTENT(article_data),
            "suggest_post": self.__get__data__ARTICLE_SUGGEST(suggest_article)
        }

