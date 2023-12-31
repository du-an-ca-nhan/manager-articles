package com.articlesproject.core.user.service;

import com.articlesproject.core.user.model.request.UserCreateAlbumRequest;
import com.articlesproject.core.user.model.request.UserUpdateAlbumRequest;
import com.articlesproject.core.user.model.response.SimpleAlbumProjRequest;
import com.articlesproject.core.user.model.response.UserAlbumResponse;
import com.articlesproject.entity.Album;
import java.util.List;

public interface UserAlbumService {

    List<UserAlbumResponse> findAllAlbumByUserId(String userId);

    List<UserAlbumResponse> findAllAlbumPublicByUserId(String userId);

    List<SimpleAlbumProjRequest> findAllSimpleAllBumByUserId(String userId, String articleId);

    Album create(UserCreateAlbumRequest request, String userId);

    Album update(UserUpdateAlbumRequest request, String id);

    boolean delete(String id);

    UserAlbumResponse findByIdAlbum(String id);

    UserAlbumResponse findByIdAndUsersId(String id, String userId);
}

