(module
	(func $even_check (param $n i32) (result i32)
		local.get $n
		i32.const 2
		i32.rem_u
		i32.const 0
		i32.eq
	)

	(func $eq_2 (param $n i32) (result i32)
		local.get $n
		i32.const 2
		i32.eq

	)

	(func $multiple_check (param $n i32) (param $m i32) (result i32)
		local.get $n
		local.get $m
		i32.rem_u
		i32.const 0
		i32.eq
	)

	(func (export "is_prime") (param $n i32) (result i32)
  		(local $i i32)
    	(if (i32.eq (local.get $n) (i32.const 1)) ;; 1 is not prime
			(then i32.const 0 return)
		)
    	(if (call $eq_2 (local.get $n))
      		(then i32.const 1 return)
		)

  		(block $not_prime
    		(call $even_check (local.get $n))
			br_if $not_prime ;; even numbers are not prime (except 2)
    
			(local.set $i (i32.const 1))

			(loop $prime_test_loop
			
				(local.tee $i (i32.add (local.get $i) (i32.const 2) ) ) ;; $i += 2
				local.get $n  ;; stack = [$n, $i]
				
				i32.ge_u ;; $i >= $n
				if  ;; if $i >= $n, $n is prime
					i32.const 1
					return
				end

				(call $multiple_check (local.get $n) (local.get $i))
				br_if $not_prime    ;; if $n is a multiple of $i this is not prime
				br $prime_test_loop ;; branch back to top of loop
			) ;; end of $prime_test_loop loop
		)  ;; end of $not_prime block
		i32.const 0 ;; return false
		)
		)