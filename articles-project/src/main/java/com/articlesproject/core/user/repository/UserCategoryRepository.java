package com.articlesproject.core.user.repository;

import com.articlesproject.core.user.model.request.UserCategoryRequest;
import com.articlesproject.core.user.model.request.UserCreateCategoryRequest;
import com.articlesproject.core.user.model.response.UserCategoryRespone;
import com.articlesproject.repository.CategoryRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface UserCategoryRepository extends CategoryRepository {
    @Query(value = """
            SELECT c.id, c.name, c.code, c.last_modified_date FROM category c JOIN articles a on c.id = a.category_id
            WHERE a.status = 3
            GROUP BY c.id, c.name, c.code, c.last_modified_date
            ORDER BY c.last_modified_date DESC
            """, nativeQuery = true)
    List<UserCategoryRespone> getAllCategory();

    @Query(value = """
            SELECT ca.id, ca.code, ca.name, ca.last_modified_date
            FROM category ca
             WHERE  ( :#{#request.code} IS NULL
                      OR :#{#request.code} LIKE '' \s
                     OR ca.code LIKE %:#{#request.code}% )
            AND ( :#{#request.name} IS NULL
                    OR :#{#request.name} LIKE '' \s
                    OR ca.name LIKE %:#{#request.name}% )
            ORDER BY ca.last_modified_date DESC
            """, countQuery = """
            SELECT ca.id, ca.code, ca.name, ca.last_modified_date
            FROM category ca
             WHERE  ( :#{#request.code} IS NULL
                      OR :#{#request.code} LIKE '' \s
                     OR ca.code LIKE %:#{#request.code}% )
            AND ( :#{#request.name} IS NULL
                    OR :#{#request.name} LIKE '' \s
                    OR ca.name LIKE %:#{#request.name}% )
            ORDER BY ca.last_modified_date DESC
            """, nativeQuery = true)
    Page<UserCategoryRespone> getAllCategoryByCensor(Pageable pageable,@Param("request") UserCategoryRequest request);

    @Query(value = """
            SELECT c.id, c.name, c.code, c.last_modified_date FROM category c
            ORDER BY c.last_modified_date DESC
            """, nativeQuery = true)
    List<UserCategoryRespone> getAllListCategory();
}
