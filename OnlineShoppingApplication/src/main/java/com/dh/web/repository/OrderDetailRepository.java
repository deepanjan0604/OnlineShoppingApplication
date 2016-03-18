package com.dh.web.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.dh.web.model.Order;
import com.dh.web.model.OrderDetail;

public interface OrderDetailRepository extends JpaRepository< OrderDetail, Integer>
{



List<OrderDetail> findByOrder(int orderId);




}





