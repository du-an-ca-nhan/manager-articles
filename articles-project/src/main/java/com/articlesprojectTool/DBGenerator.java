package com.articlesprojectTool;

import com.articlesproject.entity.*;
import com.articlesproject.infrastructure.constant.ArticleStatus;
import com.articlesproject.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EnableJpaRepositories(
        basePackages = "com.articlesproject.repository"
)
public class DBGenerator implements CommandLineRunner {


    private final boolean IS_RELEASE = false;
    @Autowired
    private AlbumRepository albumRepository;
    @Autowired
    private ArticlesRepository articlesRepository;
    @Autowired
    private CommentRepository commentRepository;
    @Autowired
    private EvalueteRepository evalueteRepository;
    @Autowired
    private PointRepository pointRepository;
    @Autowired
    private CategoryRepository categoryRepository;
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ArticlesAlbumRepository articles_albumRepository;

    @Autowired
    private ArticlesHashtagRepository articles_hashtagRepository;

    @Autowired
    private TymRepository tymRepository;

    @Autowired
    private HashtagRepository hashtagRepository;

    @Autowired
    private HistoryRepository historyRepository;

    @Autowired
    private NotificationRepository notificationRepository;

    @Override
    public void run(String... args) throws Exception {
        Users users = new Users();
        users.setCode("PH27626");
        users.setName("Pham Van Nguyen");
        users.setEmail("nguyen@fpt.edu.vn");
        users.setPhoneNumber("0343434343");
        users.setImg("https://lh5.googleusercontent.com/-a1CWlFnA5xE/AAAAAAAAAAI/AAAAAAAAl1I/UcwPajZOuN4/photo.jpg");
        users.setRole(0);
        users.setId(userRepository.save(users).getId());

        Users users1 = new Users();
        users1.setCode("PH99999");
        users1.setName("Duong Tu Thang");
        users1.setEmail("tutthang@fpt.edu.vn");
        users1.setImg("https://lh5.googleusercontent.com/-a1CWlFnA5xE/AAAAAAAAAAI/AAAAAAAAl1I/UcwPajZOuN4/photo.jpg");
        users1.setPhoneNumber("099999999");
        users1.setRole(1);
        users1.setId(userRepository.save(users1).getId());

        Category theLoai = new Category();
        theLoai.setCode("SOF1");
        theLoai.setName("Java");
        theLoai.setId(categoryRepository.save(theLoai).getId());

        Category theLoai1 = new Category();
        theLoai1.setCode("FE1");
        theLoai1.setName("Font-End");
        theLoai.setId(categoryRepository.save(theLoai1).getId());

        Hashtag hashtag = new Hashtag();
        hashtag.setTitle("#hahaha");
        hashtag.setId(hashtagRepository.save(hashtag).getId());

        Hashtag hashtag1 = new Hashtag();
        hashtag1.setTitle("#hiihii");
        hashtag1.setId(hashtagRepository.save(hashtag1).getId());

        Articles baiViet = new Articles();
        baiViet.setTitle("Xin chào các bạn");
        baiViet.setStatus(ArticleStatus.MOI_TAO);
        baiViet.setBrowseDate(1900800000L);
        baiViet.setUsersId(users.getId());
        baiViet.setCategoryId(theLoai.getId());
        baiViet.setDescriptive("ahahahahaha");
        baiViet.setContentApprove("Cũng hay, cần phát huy");
        baiViet.setEvaluateDate(null);
        baiViet.setId(articlesRepository.save(baiViet).getId());

        Articles baiViet1 = new Articles();
        baiViet1.setTitle("Xin chào các bạn");
        baiViet1.setStatus(ArticleStatus.MOI_TAO);
        baiViet1.setBrowseDate(1900800000L);
        baiViet1.setUsersId(users.getId());
        baiViet1.setCategoryId(theLoai1.getId());
        baiViet1.setDescriptive("ahahahahaha");
        baiViet1.setContentApprove("Không hay lắm, cần phát huy");
        baiViet1.setEvaluateDate(null);
        baiViet1.setId(articlesRepository.save(baiViet1).getId());

        Articles baiViet2 = new Articles();
        baiViet2.setTitle("Xin chào các bạn");
        baiViet2.setStatus(ArticleStatus.MOI_TAO);
        baiViet2.setBrowseDate(1900800000L);
        baiViet2.setUsersId(users.getId());
        baiViet2.setCategoryId(theLoai.getId());
        baiViet2.setDescriptive("ahahahahaha");
        baiViet2.setContentApprove("Không hay lắm, cần phát huy");
        baiViet2.setEvaluateDate(null);
        baiViet2.setId(articlesRepository.save(baiViet2).getId());

        ArticlesHashtag articles_hashtag = new ArticlesHashtag();
        articles_hashtag.setArticlesId(baiViet.getId());
        articles_hashtag.setHashtagId(hashtag.getId());
        articles_hashtag.setId(articles_hashtagRepository.save(articles_hashtag).getId());

        Tyms tym = new Tyms();
        tym.setUsersId(users.getId());
        tym.setArticleId(baiViet.getId());
        tymRepository.save(tym);

        Tyms tym1 = new Tyms();
        tym1.setUsersId(users.getId());
        tym1.setArticleId(baiViet1.getId());
        tymRepository.save(tym1);

        Tyms tym2 = new Tyms();
        tym2.setUsersId(users.getId());
        tym2.setArticleId(baiViet2.getId());
        tymRepository.save(tym2);

        Tyms tym3 = new Tyms();
        tym3.setUsersId(users1.getId());
        tym3.setArticleId(baiViet2.getId());
        tymRepository.save(tym3);

        Comments comments = new Comments();
        comments.setContent("Rất biết ơn về những chia sẻ thực sự bổ ích của bạn.\n" +
                "Mong bạn và gia đình nhiều sức khỏe, bình an.\n" +
                "HH");
        comments.setUsersId(users1.getId());
        comments.setArticlesId(baiViet.getId());
        comments.setId(commentRepository.save(comments).getId());

        Comments comments1 = new Comments();
        comments1.setContent("thank");
        comments1.setUsersId(users.getId());
        comments1.setReply(comments.getId());
        comments1.setArticlesId(baiViet.getId());
        comments1.setId(commentRepository.save(comments1).getId());

        Comments comments2 = new Comments();
        comments2.setContent("Anh Thịnh ơi, hiện tại team em đang cần làm slide liên quan tới value của BA");
        comments2.setUsersId(users1.getId());
        comments2.setArticlesId(baiViet1.getId());
        comments2.setId(commentRepository.save(comments2).getId());

        Comments comments3 = new Comments();
        comments3.setContent("À hình đó anh tự vẽ á, em cứ lấy thoải mái nhé, nhưng nhớ ghi nguồn thinhnotes.com vào giúp anh nha");
        comments3.setUsersId(users.getId());
        comments3.setReply(comments2.getId());
        comments3.setArticlesId(baiViet1.getId());
        comments3.setId(commentRepository.save(comments3).getId());

        Album album = new Album();
        album.setTitle("Java");
        album.setUsersId(users1.getId());
        album.setId(albumRepository.save(album).getId());

        Album album1 = new Album();
        album1.setTitle("Java");
        album1.setUsersId(users1.getId());
        album1.setId(albumRepository.save(album1).getId());

        Album album2 = new Album();
        album2.setUsersId(users.getId());
        album2.setId(albumRepository.save(album2).getId());

        ArticlesAlbum baiVietAlbum = new ArticlesAlbum();
        baiVietAlbum.setAlbumId(album.getId());
        baiVietAlbum.setArticlesId(baiViet.getId());
        baiVietAlbum.setId(articles_albumRepository.save(baiVietAlbum).getId());

        Point diem = new Point();
        diem.setPoint(9);
        diem.setCreateAt(1900800000L);
        diem.setFeedback("");
        diem.setArticlesId(baiViet.getId());
        diem.setUsersId(users.getId());
        diem.setId(pointRepository.save(diem).getId());

        Point diem1 = new Point();
        diem1.setPoint(9);
        diem1.setCreateAt(1900800000L);
        diem1.setFeedback("");
        diem1.setArticlesId(baiViet.getId());
        diem1.setUsersId(users.getId());
        diem1.setId(pointRepository.save(diem1).getId());

        Point diem2 = new Point();
        diem2.setPoint(9);
        diem2.setCreateAt(1900800000L);
        diem2.setFeedback("");
        diem2.setArticlesId(baiViet.getId());
        diem2.setUsersId(users.getId());
        diem2.setId(pointRepository.save(diem2).getId());

        Point diem3 = new Point();
        diem3.setPoint(9);
        diem3.setCreateAt(1900800000L);
        diem3.setFeedback("");
        diem3.setArticlesId(baiViet.getId());
        diem3.setUsersId(users.getId());
        diem3.setId(pointRepository.save(diem3).getId());

        Evaluate danhGia = new Evaluate();
        danhGia.setStar(2);
        danhGia.setContent("Bug");
        danhGia.setUsersId(users.getId());
        danhGia.setArticlesId(baiViet1.getId());
        danhGia.setId(evalueteRepository.save(danhGia).getId());

        Evaluate danhGia1 = new Evaluate();
        danhGia1.setStar(2);
        danhGia1.setContent("Bug");
        danhGia1.setUsersId(users.getId());
        danhGia1.setArticlesId(baiViet1.getId());
        danhGia1.setId(evalueteRepository.save(danhGia).getId());
        danhGia1.setId(evalueteRepository.save(danhGia1).getId());


        Evaluate danhGia2 = new Evaluate();
        danhGia2.setStar(2);
        danhGia2.setContent("Bug");
        danhGia2.setUsersId(users.getId());
        danhGia2.setArticlesId(baiViet1.getId());
        danhGia2.setId(evalueteRepository.save(danhGia).getId());
        danhGia2.setId(evalueteRepository.save(danhGia2).getId());

        History history = new History();
        history.setArticlesId(baiViet.getId());
        history.setUsersId(users.getId());
        history.setCreateAt(1900800000L);
        history.setId(historyRepository.save(history).getId());

        Notification notification = new Notification();
        notification.setReplyId(users.getId());
        notification.setStatus(false);
        notification.setArticlesId(baiViet.getId());
        notification.setUsersId(users1.getId());
        notification.setContentActivity("aaaaaaaaa");
        notification.setType(1);
        notification.setId(notificationRepository.save(notification).getId());

    }

    public static void main(String[] args) {
        ConfigurableApplicationContext ctx = SpringApplication.run(DBGenerator.class);
        ctx.close();
    }

}
